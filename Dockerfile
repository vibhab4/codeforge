# Serve the pre-built Vite app using Nginx

FROM nginx:alpine

# Clean default nginx HTML directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the pre-built dist/ folder into Nginx
COPY dist/ /usr/share/nginx/html

# Optional: Handle React Router properly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
