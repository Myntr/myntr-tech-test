
![Myntr](https://imgur.com/laewQrV.png)

# Myntr Technical Test

## 1. Repo Setup ##

### Theme Overview

This Shopify theme is built using [Theme Lab](https://github.com/uicrooks/shopify-theme-lab).  Shopify Theme Lab is a customizable modular development environment for Shopify theme development. It is built on top of the Shopify CLI and extends it with additional workflow and building capabilities. By default it's bundled with Vue.js and Tailwind CSS.

### Initial Setup
1. If you haven't already installed the Shopify CLI on your local machine, follow the instructions [here](https://shopify.dev/themes/tools/cli#installation).
2. Clone the project repo locally.
3. Run command `nvm use` or use at least Node v14.17.0
4. Install with command: `npm install`
5. Login to the Shopify store with command: `npm run login`
6. Create your development theme and start your dev server using command: `npm run start`
### Deployment
1. Build and deploy to a *new* theme with command `npm run deploy:new`.
2. Build and deploy to an *existing* theme with command `npm run deploy`.

## 2. Test Instructions ##

## Goal ##
You will be building a new product template section that includes schema to output a heading and a product collection slider.

## Store Details ##
You will be developing on the [Myntr dev store](https://myntr-dev.myshopify.com/admin).
You will generate a shareable preview theme using the commands listed in README.

The store frontend password is `myntr`.

## Brief ##

Create a new section within the `sections` directory with the title `upsell-product-slider.liquid`.

Add `{% schema $}` to this new section that includes 3 settings:

1. Heading for the Customizer. See [the heading doc here](https://shopify.dev/themes/architecture/settings/sidebar-settings#header).
2. [Text setting](https://shopify.dev/themes/architecture/settings/input-settings#text) for a title. This title will be shown above the slider on the DOM.
3. [Collection setting](https://shopify.dev/themes/architecture/settings/input-settings#collection) for products to display in the slider.

There is an existing collection titled "Upsell". You can see the collection [here](https://myntr-dev.myshopify.com/admin/collections/434370806043). This collection contains 6 products, and you want to display these products within a slider.

Add the `upsell-product-slider.liquid` section to the `product.json` template. Display the section below the existing `Product information` section.

After the section is created and added to the product template, you can begin with the more complex slider development. [View an example of a product slider here](https://codepen.io/marufalbashir/pen/LyaQdq). You can choose to show either 1 slide or multiple slides at once. The example provided shows multiple slides on desktop, and only 1 slide on mobile.

## Slider Requirements ##
Each slide in the slider must show:
1. Product featured image
2. Product title
3. Product price

## Test Submission ##
1. Create a branch from `main`
2. Once you have completed development, push all commits to your branch on the remote repo.
2. Deploy your code to a Theme Preview using the `npm run deploy:new` command.
3. Include your last name on the theme preview and a date.
3. Email `kyle@myntr.io` with your branch and theme preview.

## Tips ##
1. You can view the starter section file `upsell-product-slider--starter.liquid` to help develop the initial section. The starter file contains barebones liquid code.
2. Recommend using the Theme's slider logic, Flickity, Slick, Swiper.js, or any preferred carousel library to build the slider.
3. View the [Shopify product object docs](https://shopify.dev/api/liquid/objects/product) to see the properties of a product.


## Bonus ##

The following instructions are not required for a successful test. They are purely for increasing your knowledge of Shopify.

### Add to Cart

A standard Quick Add in eCommerce is when a user clicks on the Add to cart button and the product is added to the user’s cart without refreshing the page.

Here is the [documentation](https://shopify.dev/api/ajax) for using Shopify's AJAX API in order to add a product to the cart.

Create a button on each slide that, when clicked, adds the product to the cart.

### Product Badge

One of the products has a `badge: Sale` tag. Try to use that tag in order to display a badge on the product in the slider. You can read more about product tags [here](https://shopify.dev/api/liquid/objects/product#product-tags). You can see a visual example of the Sale badge by visiting this page: https://myntr-dev.myshopify.com/collections/upsell.
