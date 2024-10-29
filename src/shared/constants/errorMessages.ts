export const ErrorMessages = {
    // Not Found errors
    BRAND_NOT_FOUND: 'Brand not found',
    CATEGORY_NOT_FOUND: 'Category not found',
    PRODUCT_NOT_FOUND: 'Product not found',
    COLOR_NOT_FOUND: 'color not found',
    COUPON_NOT_FOUND: 'coupon not found',

    // User related errors
    EMAIL_ALREADY_IN_USE: 'Email is already in use',
    USER_NOT_FOUND: 'User not found',
    FAILED_TO_UPDATE_USER: 'Failed to update user',
    NEW_PASSWORDS_MUST_MATCH: 'New passwords must match',
    INCORRECT_PASSWORD: 'Incorrect password',

    // Auth related errors
    WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    REFRESH_TOKEN_NOT_VALID: 'Refresh token is not valid',
    USER_WITH_THIS_EMAIL_NOT_FOUND: 'User with this email not found',
    INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token',
    LOGOUT_SUCCESS: 'Successfully logged out',
    REFRESH_TOKEN_MISSING: 'Refresh token missing',
    PASSWORD_RESET_TOKEN_SENT: 'Password reset token sent to email',

    // Category related errors
    CATEGORY_ALREADY_EXISTS: 'Category already exists',

    // Brand related errors
    BRAND_ALREADY_EXISTS: 'Brand already exists',

    // Coupon related errors
    COUPON_ALREADY_EXISTS: 'Coupon already exists',
    COUPON_NOT_FOUND_OR_INACTIVE: 'Coupon not found or inactive',
    NO_EXPIRED_COUPONS_FOUND: 'No expired coupons found',
    START_DATE_MUST_BE_IN_FUTURE: 'Start date must be today or in the future.',
    END_DATE_MUST_BE_AFTER_START_DATE:
        'End date must be equal to or after the start date.',
}
