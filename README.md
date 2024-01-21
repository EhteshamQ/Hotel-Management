# Hotel Management Application with Next.js

Welcome to the Hotel Management Application repository! This project is built using Next.js, Sanity CMS, NextAuth for authentication, Stripe for payments, React Charts for visualizations, and Vercel for deployment.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)

## Overview

This application serves as a comprehensive hotel management solution. It leverages the power of Next.js for a modern and efficient frontend, Sanity CMS for content management, NextAuth for secure authentication with Google and GitHub providers, Stripe for handling payments, React Charts for insightful data visualization, and Vercel for seamless deployment.

## Features

- **User Authentication**: Utilizes NextAuth to provide secure authentication, supporting Google and GitHub login providers.

- **CMS Integration**: Content is managed effortlessly with Sanity CMS, allowing easy updates and modifications.

- **Payment Handling**: Integrated with Stripe for secure and reliable payment processing, ensuring a smooth transaction experience.

- **Data Visualization**: Utilizes React Charts to generate informative charts and graphs, providing valuable insights into hotel management data.

- **Deployment with Vercel**: Easily deploy your application using the Vercel platform, making it accessible to users worldwide.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/hotel-management-app.git`

2. Install dependencies: `npm install`

3. Set up configuration (refer to [Configuration](#configuration) section)

4. Run the application: `npm run dev`

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Configuration

Before running the application, you need to set up the necessary configurations. Update/Add the following files:

- `.env.local`: Configure environment variables for API keys, authentication providers, and other sensitive information.

- `sanity.config.ts`: Update the Sanity project ID and dataset name.

## Usage

1. **Login**: Start by logging into the application using your Google or GitHub account through the provided authentication options.

2. **Browse Rooms**: Explore the available rooms in the hotel. Each room will have detailed information, including pricing, amenities, and availability.

3. **Book Rooms**: Once you find a room that suits your preferences, proceed to the booking section. Select the desired dates and confirm the booking. A confirmation email will be sent to you.

4. **View Booking History**: Check your booking history to see a list of rooms you've booked in the past. This section provides details about each booking, including check-in and check-out dates.

5. **Manage Bookings**: Modify or cancel existing bookings as needed. Ensure to check the cancellation policy for any associated fees.

6. **Explore Hotel Amenities**: Learn more about the hotel's facilities and services. This includes information about restaurants, gyms, pools, and other amenities.

7. **Checkout Other Rooms**: If you're interested in exploring other available rooms, use the intuitive navigation to view different room categories and choose the one that best fits your needs.

8. **Analytics Dashboard**: Head to the analytics dashboard to get insights into hotel occupancy, popular room choices, and other statistical data represented using React Charts.

## Deployment

This application has been deployed to Vercel. You can access the live demo [here](https://hotel-management-gamma-three.vercel.app/).
