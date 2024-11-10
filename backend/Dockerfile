FROM dunglas/frankenphp

WORKDIR /app

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/* \
    && install-php-extensions \
    pdo_pgsql \
    intl \
    zip