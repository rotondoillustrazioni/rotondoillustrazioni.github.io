# Rotondo website

This repository provides a `Dockerfile` that let you build the Rotondo website client.
Please check the [Rotondo server repository](https://github.com/rotondoillustrazioni/rotondo-server) for the server side.

In order to build the docker you have to provide in the `.env` file:
```bash
REACT_APP_BASE_URL
REACT_APP_SOCKET_ORIGIN
```

In order to deploy it you have to clone the repository and run the following commands:

```bash
docker build -t rotondo-client .
```

```bash
docker run --rm -p 80:80 rotondo-client
```