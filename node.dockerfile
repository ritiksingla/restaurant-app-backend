# Base image
ARG		NODE_VERSION
FROM		node:${NODE_VERSION}

# Labels
LABEL		author="ritik singla"

# Environment variables
ENV		NODE_ENV=prod
ENV		PORT=5000

# NPM Install
WORKDIR		/app
COPY		package.json package-lock.json ./
RUN		npm install

# Copy everything else
COPY		. /app
EXPOSE		$PORT

# Entrypoint
ENTRYPOINT	["npm", "start"]