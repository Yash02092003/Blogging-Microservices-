# Blog Project

This project is a microservices-based blog application. It consists of several services, each responsible for a specific part of the application. The services communicate with each other using an event bus.

## Project Structure

### Services

- **Client**: The frontend of the application built with React.
- **Comments**: Manages comments on posts.
- **Event Bus**: Handles communication between services.
- **Moderation**: Moderates comments.
- **Posts**: Manages blog posts.
- **Query**: Aggregates data for the frontend.

## Getting Started

### Prerequisites

- Docker
- Kubernetes
- Skaffold

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies for each service:
    ```sh
    cd client && npm install
    cd ../comments && npm install
    cd ../event-bus && npm install
    cd ../moderation && npm install
    cd ../posts && npm install
    cd ../query && npm install
    ```

### Running the Application

1. Start the Kubernetes cluster:
    ```sh
    minikube start
    ```

2. Deploy the application using Skaffold:
    ```sh
    skaffold dev
    ```

### Kubernetes Manifests

The Kubernetes manifests for each service are located in the `infra/k8s` directory.

- [event-bus-depl.yaml](infra/k8s/event-bus-depl.yaml)
- [query-depl.yaml](infra/k8s/query-depl.yaml)
- [moderation-depl.yaml](infra/k8s/moderation-depl.yaml)
- [posts-depl.yaml](infra/k8s/posts-depl.yaml)

### Skaffold Configuration

The Skaffold configuration is located in the `skaffold.yaml` file.

## Available Scripts

### Client

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the configuration.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

## License

This project is licensed under the MIT License.
