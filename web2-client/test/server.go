package main

import (
	"fmt"
	"io"
	"net/http"
)

func enableCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func readBody(r *http.Request) {
	res, err := io.ReadAll(r.Body)
	fmt.Println(err)
	fmt.Println(string(res))
}

func main() {
	r := http.NewServeMux()

	r.HandleFunc("POST /api/patient", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(&w)
		readBody(r)
	})
	server := http.Server{
		Addr:    ":8080",
		Handler: r,
	}
	r.HandleFunc("POST /api/doctor/upload", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(&w)
		readBody(r)
	})
	if server.ListenAndServe() != nil {
		fmt.Println("Error creating a server")
	}
}
