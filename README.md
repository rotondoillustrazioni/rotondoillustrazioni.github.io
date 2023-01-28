# Rotondo website

This repository provides a `Dockerfile` that let you build the Rotondo website client.
Please check the [Rotondo website repository]() for the server side.

In order to deploy it you have to clone the repository and run the following command:

```bash
docker build -t rotondo-client .
```

```bash
docker run --rm -p 80:80 rotondo-client
```

In order to build the docker you have to provide:

in `.env` file
```bash
REACT_APP_BASE_URL
REACT_APP_SOCKET_ORIGIN
```
