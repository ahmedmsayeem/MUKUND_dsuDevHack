package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func readBody(r *http.Request) {
	res, err := io.ReadAll(r.Body)
	fmt.Println(err)
	fmt.Println(string(res))
}

func main() {
	router := http.NewServeMux()
	router.HandleFunc("/api/set-patient/upload", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		fmt.Println("Access request")
		enableCors(&w)

		if err := r.ParseMultipartForm(10 << 20); err != nil { // Increased max size to 10 MB
			http.Error(w, "Error parsing file", http.StatusBadRequest)
			return
		}

		files := r.MultipartForm.File["files"]
		for _, file := range files {
			ptr, err := file.Open()
			if err != nil {
				http.Error(w, "Error opening file", http.StatusInternalServerError)
				return
			}
			defer ptr.Close() // Close the file pointer when done

			// Sanitize the filename
			safeFileName := filepath.Base(file.Filename)

			newFile, err := os.Create(fmt.Sprintf("../../public/uploads/%s", safeFileName))
			if err != nil {
				http.Error(w, "Error creating file", http.StatusInternalServerError)
				return
			}
			defer newFile.Close() // Ensure the new file is closed when done

			if _, err := io.Copy(newFile, ptr); err != nil {
				http.Error(w, "Error copying file", http.StatusInternalServerError)
				return
			}
		}

		w.WriteHeader(http.StatusOK) // Send a success response
		fmt.Fprintln(w, `{"message": "Files uploaded successfully"}`)
	})
	router.HandleFunc("POST /api/patient", func(w http.ResponseWriter, r *http.Request) {
		readBody(r)
	})
	server := http.Server{
		Addr:    ":8081",
		Handler: router,
	}

	fmt.Println("Server started on :8081")
	if err := server.ListenAndServe(); err != nil {
		fmt.Println("Server stopped:", err)
	}
}
