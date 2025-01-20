# Base image with PHP 8.3 and Apache
FROM php:8.3.11-apache

# Set working directory to Apache's web root
WORKDIR /var/www/html

# Copy application source code into the container
COPY src/ /var/www/html

# Install PHP extensions (including pdo and pdo_mysql)
RUN docker-php-ext-install pdo pdo_mysql \
    && docker-php-ext-enable pdo pdo_mysql

# Install required PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Ensure proper permissions for the application
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Enable Apache mod_rewrite for friendly URLs (if needed)
RUN a2enmod rewrite

# Restart Apache service to apply changes
CMD ["apache2-foreground"]