# NexSphereShop API

NexSphereShop API is a robust e-commerce solution built with Node.js and Express, utilizing MongoDB as the database. The API provides a comprehensive set of features for managing products, handling user authentication, processing orders, and integrating secure payment with Stripe.

## Table of Contents

[![Contributors](https://img.shields.io/github/contributors/unRealAhmed/NexSphereShop-API.svg)](https://github.com/unRealAhmed/NexSphereShop-API/graphs/contributors)

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [GitHub Repository](#github-repository)

## Features

1. **Authentication using JWT:**

   - Users can securely authenticate using JSON Web Tokens for enhanced security.

2. **Product Management:**

   - CRUD operations for products.
   - Only admins can create products, categories, and brands.

3. **File Upload with Cloudinary:**

   - Seamless integration with Cloudinary for image uploads for products and categories.

4. **Shopping Cart and Orders:**

   - Users can manage their shopping cart, adding, updating, and removing items.
   - Order processing with order history for users.

5. **Payment Integration with Stripe:**

   - Secure payment processing using Stripe.
   - Webhook integration for real-time updates on payment events.

6. **Secure API:**

   - Implementation of security measures to protect user data and transactions.

7. **Admin-Only Operations:**

   - Only administrators have the authority to create products, categories, and brands.

8. **Pagination, Sorting, and Searching:**

   - Enhanced user experience with support for pagination, sorting, and searching for products.

9. **Limit Fields:**

   - Users can limit the fields returned in API responses for efficiency.

10. **Comprehensive Documentation:**
    - Extensive documentation available in the "documentation" folder for developers.

## Prerequisites

Before running the NexSphereShop API, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (with connection details configured in a .env file)

## Usage

Once the server is running, interact with the API using tools like [Postman](https://www.postman.com/) or integrate it into your application.

## API Endpoints

## Users

- `POST /api/v1/users/signup`: Create a new user account.
- `POST /api/v1/users/login`: Log in to an existing account.
- `GET /api/v1/users/logout`: Log out the current user.
- `POST /api/v1/users/forgotPassword`: Request a password reset.
- `PATCH /api/v1/users/resetPassword/:token`: Reset the password using a provided token.
- `GET /api/v1/users/me`: Get information about the current user.
- `PATCH /api/v1/users/updateMyPassword`: Update the password for the current user.
- `PATCH /api/v1/users/updateMe`: Update user details.
- `DELETE /api/v1/users/deleteMe`: Delete the current user.
- `PATCH /api/v1/users/updateShipping`: Update the shipping address for the current user.
- `GET /api/v1/users (Admin-only)`: Get all users.
- `POST /api/v1/users (Admin-only)`: Create a new user.
- `GET /api/v1/users/:id (Admin-only)`: Get a specific user.
- `PATCH /api/v1/users/:id (Admin-only)`: Update a user.
- `DELETE /api/v1/users/:id (Admin-only)`: Delete a user.

## Products

- `GET /api/v1/products`: Get all products.
- `GET /api/v1/products/:id`: Get details for a specific product.
- `POST /api/v1/products (Admin-only)`: Create a new product with image uploads.
- `PATCH /api/v1/products/:id (Admin-only)`: Update a product.
- `DELETE /api/v1/products/:id (Admin-only)`: Delete a product.

## Categories

- `GET /api/v1/category`: Get all categories.
- `GET /api/v1/category/:id`: Get details for a specific category.
- `POST /api/v1/category (Admin-only)`: Create a new category with image upload.
- `PATCH /api/v1/category/:id (Admin-only)`: Update a category.
- `DELETE /api/v1/category/:id (Admin-only)`: Delete a category.

## Brands

- `GET /api/v1/brands`: Get all brands.
- `GET /api/v1/brands/:id`: Get details for a specific brand.
- `POST /api/v1/brands (Admin-only)`: Create a new brand.
- `PATCH /api/v1/brands/:id (Admin-only)`: Update a brand.
- `DELETE /api/v1/brands/:id (Admin-only)`: Delete a brand.

## Colors

- `GET /api/v1/colors`: Get all colors.
- `GET /api/v1/colors/:id`: Get details for a specific color.
- `POST /api/v1/colors (Admin-only)`: Create a new color.
- `PATCH /api/v1/colors/:id (Admin-only)`: Update a color.
- `DELETE /api/v1/colors/:id (Admin-only)`: Delete a color.

## Coupons

- `GET /api/v1/coupons`: Get all coupons.
- `GET /api/v1/coupons/:id`: Get details for a specific coupon.
- `POST /api/v1/coupons (Admin-only)`: Create a new coupon.
- `PATCH /api/v1/coupons/:id (Admin-only)`: Update a coupon.
- `DELETE /api/v1/coupons/:id (Admin-only)`: Delete a coupon.

## Orders

- `GET /api/v1/orders/sales/stats`: Get statistics on sales.
- `POST /api/v1/orders (Admin-only)`: Create a new order.
- `GET /api/v1/orders`: Get all orders.
- `GET /api/v1/orders/:id`: Get details for a specific order.
- `PATCH /api/v1/orders/:id (Admin-only)`: Update an order.

## Reviews

- `GET /api/v1/reviews`: Get all reviews.
- `POST /api/v1/reviews (User-only)`: Create a new review.
- `GET /api/v1/reviews/:id`: Get details for a specific review.
- `PATCH /api/v1/reviews/:id (User-only)`: Update a review.
- `DELETE /api/v1/reviews/:id (User-only)`: Delete a review.

### Authentication

- `POST /api/v1/signup`: Sign up and create a new user account.

  - Request Body:
    ```json
    {
      "name": "Your Name",
      "email": "your@email.com",
      "password": "yourpassword",
      "passwordConfirm": "yourpassword"
    }
    ```

- `POST /api/v1/login`: Log in and obtain an authentication token.
  - Request Body:
    ```json
    {
      "email": "your@email.com",
      "password": "yourpassword"
    }
    ```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

GitHub : [Ahmed Sayed](https://github.com/unRealAhmed)

Happy coding! 🚀
