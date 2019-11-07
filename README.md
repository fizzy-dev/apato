Ứng dụng tìm kiếm nhà trọ

Lệnh chạy docker image:

# Lệnh build:
docker build -t <username>/apato_backend .

# Lệnh xem images:
docker images

# Chạy container
docker run -p 80:80 -d <username>/apato_backend

# Lấy container id
$ docker ps

# Xem log container process
$ docker logs <container id>
