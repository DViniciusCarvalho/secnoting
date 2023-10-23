# Running Secnoting on Your Machine

First of all, you'll need Git, Docker, and Docker Compose installed on your machine. If you haven't already, you can download and install them using the following links:

- [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Docker Compose Installation Guide](https://docs.docker.com/compose/install)

**Note:** The next step will start 3 containers on your machine.

The next step is to run the following commands in your terminal:

```bash
git clone https://github.com/DViniciusCarvalho/secnoting.git
cd secnoting
docker-compose up
```

The containers will start in the ports:
- 7070 (Front-end)
- 9090 (Back-end)
- 3400 (Database)

After starting the containers, access http://localhost:7070 to interact with the application.