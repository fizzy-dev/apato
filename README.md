# Ứng dụng tìm kiếm nhà trọ
Bài tập project môn thực hành lập trình web
## Dùng dockerfile chạy riêng lẻ các container;
1. Lệnh build:
- docker build -t <username>/apato_backend .

2. Lệnh xem images:
- $ docker images

3. Lệnh chạy container
- $ docker run -p 80:80 -d <username>/apato_backend

4. Lệnh danh sách container id
- $ docker ps

5. Lệnh Xem log container process
- $ docker logs <container id>

## Dùng docker-compose:

1. Lệnh build 
- $ docker-compose build
2. Lệnh chạy composed containers
- $ docker-compose up