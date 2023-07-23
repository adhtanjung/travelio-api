build:
	docker build -t "travelio-api" .
run:
	docker run --rm -d -p 5000:45000 --name travelio-api travelio-api
stop:
	docker stop travelio-api
	docker rm travelio-api