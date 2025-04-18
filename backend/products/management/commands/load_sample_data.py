from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from products.models import DeliveredOrder, Product, ProductCost

User = get_user_model()

SAMPLE_PRODUCTS = [
    {
        "product_name": "PSP",
        "product_category": "Electronics",
        "product_image": "/images/psp.jpg",
        "product_selling_price": 2700,
        "product_description": "PlayStation Portable (PSP) is a handheld game console developed by Sony Computer Entertainment. It was released in 2004 and is known for its compact design and extensive library of games.",
        "total_returns": 50,
        "delivered_orders": [
            {"price": 2700, "quantity": 1000, "discount": False},
            {"price": 2500, "quantity": 1000, "discount": True},
            {"price": 2700, "quantity": 1000, "discount": False},
            {"price": 2700, "quantity": 1000, "discount": True},
            {"price": 2700, "quantity": 1000, "discount": False},
            {"price": 2650, "quantity": 800, "discount": True},
            {"price": 2700, "quantity": 1200, "discount": False},
            {"price": 2750, "quantity": 600, "discount": False},
        ],
        "product_cost": {
            "product_cost": 900,
            "confirmation_fees": 100,
            "packaging_fees": 100,
            "return_cost": 290,
            "ads_cost": 2000,
        },
    },
    {
        "product_name": "Nintendo Switch",
        "product_category": "Electronics",
        "product_image": "/images/switch.jpg",
        "product_selling_price": 3200,
        "product_description": "The Nintendo Switch is a hybrid video game console that can be used as both a home console and a portable device. It was released in 2017 and features detachable controllers called Joy-Cons.",
        "total_returns": 30,
        "delivered_orders": [
            {"price": 3200, "quantity": 800, "discount": False},
            {"price": 3000, "quantity": 500, "discount": True},
            {"price": 3200, "quantity": 950, "discount": False},
            {"price": 3100, "quantity": 750, "discount": True},
            {"price": 3250, "quantity": 600, "discount": False},
        ],
        "product_cost": {
            "product_cost": 1200,
            "confirmation_fees": 150,
            "packaging_fees": 120,
            "return_cost": 320,
            "ads_cost": 1800,
        },
    },
    {
        "product_name": "AirPods Pro",
        "product_category": "Audio",
        "product_image": "/images/airpods.jpg",
        "product_selling_price": 1800,
        "product_description": "AirPods Pro are wireless Bluetooth earbuds developed by Apple. They feature active noise cancellation, a customizable fit, and are sweat and water resistant.",
        "total_returns": 25,
        "delivered_orders": [
            {"price": 1800, "quantity": 1500, "discount": False},
            {"price": 1650, "quantity": 800, "discount": True},
            {"price": 1800, "quantity": 1200, "discount": False},
            {"price": 1750, "quantity": 900, "discount": True},
            {"price": 1850, "quantity": 700, "discount": False},
        ],
        "product_cost": None,  # No product cost for this product
    },
    {
        "product_name": "Samsung Galaxy S23",
        "product_category": "Smartphones",
        "product_image": "/images/galaxy_s23.jpg",
        "product_selling_price": 5500,
        "product_description": "The Samsung Galaxy S23 is a flagship smartphone featuring a powerful processor, advanced camera system, and a high-resolution display.",
        "total_returns": 15,
        "delivered_orders": [
            {"price": 5500, "quantity": 600, "discount": False},
            {"price": 5200, "quantity": 300, "discount": True},
            {"price": 5500, "quantity": 450, "discount": False},
            {"price": 5300, "quantity": 250, "discount": True},
        ],
        "product_cost": None,  # No product cost for this product
    },
    # New products
    {
        "product_name": "MacBook Pro M3",
        "product_category": "Computers",
        "product_image": "/images/macbook_pro.jpg",
        "product_selling_price": 8500,
        "product_description": "The MacBook Pro with M3 chip delivers exceptional performance and battery life. It features a stunning Liquid Retina XDR display, MagSafe charging, and a range of connectivity options.",
        "total_returns": 8,
        "delivered_orders": [
            {"price": 8500, "quantity": 200, "discount": False},
            {"price": 8200, "quantity": 150, "discount": True},
            {"price": 8500, "quantity": 180, "discount": False},
            {"price": 8400, "quantity": 120, "discount": True},
        ],
        "product_cost": {
            "product_cost": 5500,
            "confirmation_fees": 200,
            "packaging_fees": 150,
            "return_cost": 450,
            "ads_cost": 1200,
        },
    },
    {
        "product_name": "iPad Air",
        "product_category": "Tablets",
        "product_image": "/images/ipad_air.jpg",
        "product_selling_price": 4200,
        "product_description": "The iPad Air features a 10.9-inch Liquid Retina display, A14 Bionic chip, and support for Apple Pencil and Magic Keyboard. It's perfect for productivity, creativity, and entertainment.",
        "total_returns": 12,
        "delivered_orders": [
            {"price": 4200, "quantity": 400, "discount": False},
            {"price": 4000, "quantity": 300, "discount": True},
            {"price": 4200, "quantity": 350, "discount": False},
        ],
        "product_cost": {
            "product_cost": 2800,
            "confirmation_fees": 120,
            "packaging_fees": 100,
            "return_cost": 300,
            "ads_cost": 900,
        },
    },
    {
        "product_name": "Sony WH-1000XM5",
        "product_category": "Audio",
        "product_image": "/images/sony_headphones.jpg",
        "product_selling_price": 2100,
        "product_description": "Sony's flagship noise-cancelling headphones with industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life.",
        "total_returns": 10,
        "delivered_orders": [
            {"price": 2100, "quantity": 600, "discount": False},
            {"price": 1950, "quantity": 400, "discount": True},
            {"price": 2100, "quantity": 550, "discount": False},
            {"price": 2000, "quantity": 450, "discount": True},
        ],
        "product_cost": None,  # No product cost for this product
    },
    {
        "product_name": "Xbox Series X",
        "product_category": "Electronics",
        "product_image": "/images/xbox_series_x.jpg",
        "product_selling_price": 3800,
        "product_description": "Microsoft's most powerful console featuring 4K gaming at up to 120 FPS, a custom SSD for fast loading times, and backward compatibility with thousands of games.",
        "total_returns": 18,
        "delivered_orders": [
            {"price": 3800, "quantity": 300, "discount": False},
            {"price": 3600, "quantity": 200, "discount": True},
            {"price": 3800, "quantity": 250, "discount": False},
        ],
        "product_cost": {
            "product_cost": 2500,
            "confirmation_fees": 150,
            "packaging_fees": 130,
            "return_cost": 380,
            "ads_cost": 1000,
        },
    },
    {
        "product_name": "Dyson V15 Detect",
        "product_category": "Home Appliances",
        "product_image": "/images/dyson_v15.jpg",
        "product_selling_price": 3500,
        "product_description": "Dyson's most powerful cordless vacuum with a laser that reveals microscopic dust and an LCD screen that shows what you're picking up.",
        "total_returns": 15,
        "delivered_orders": [
            {"price": 3500, "quantity": 250, "discount": False},
            {"price": 3300, "quantity": 150, "discount": True},
            {"price": 3500, "quantity": 200, "discount": False},
            {"price": 3400, "quantity": 180, "discount": True},
        ],
        "product_cost": None,  # No product cost for this product
    },
    {
        "product_name": "GoPro HERO12 Black",
        "product_category": "Photography",
        "product_image": "/images/gopro_hero12.jpg",
        "product_selling_price": 2800,
        "product_description": "The ultimate action camera with 5.3K video, 27MP photos, and improved stabilization for smooth footage even in extreme conditions.",
        "total_returns": 20,
        "delivered_orders": [
            {"price": 2800, "quantity": 400, "discount": False},
            {"price": 2650, "quantity": 300, "discount": True},
            {"price": 2800, "quantity": 350, "discount": False},
        ],
        "product_cost": {
            "product_cost": 1600,
            "confirmation_fees": 80,
            "packaging_fees": 90,
            "return_cost": 250,
            "ads_cost": 800,
        },
    },
]


class Command(BaseCommand):
    help = "Populates the database with sample products, product costs, and delivered orders"

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, help="Username to associate the products with")
        parser.add_argument("--clean", action="store_true", help="Remove existing products before adding new ones")

    def handle(self, *args, **options):
        # Get the user to associate products with
        username = options.get("username")
        clean = options.get("clean", False)

        if username:
            try:
                user = User.objects.get(username=username)
                self.stdout.write(self.style.SUCCESS(f"Using existing user: {username}"))
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"User {username} does not exist"))
                return
        else:
            # Get or create a default user if no username is provided
            user, created = User.objects.get_or_create(
                username="demo", defaults={"email": "demo@example.com", "is_active": True}
            )

            if created:
                user.set_password("demo1234")
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Created new user: demo (password: demo1234)"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Using existing user: demo"))

        # Clean existing products if requested
        if clean:
            existing_count = Product.objects.filter(user=user).count()
            Product.objects.filter(user=user).delete()
            self.stdout.write(self.style.SUCCESS(f"Deleted {existing_count} existing products"))

        # Create the sample products
        for product_data in SAMPLE_PRODUCTS:
            # Extract and remove nested data
            delivered_orders_data = product_data.pop("delivered_orders")
            product_cost_data = product_data.pop("product_cost")

            # Create the product
            product = Product.objects.create(user=user, **product_data)

            # Create product costs if data is provided
            if product_cost_data:
                ProductCost.objects.create(product=product, **product_cost_data)
                self.stdout.write(f"  Added product costs for {product.product_name}")

            # Create delivered orders
            for order_data in delivered_orders_data:
                DeliveredOrder.objects.create(product=product, **order_data)

            self.stdout.write(f"  Added {len(delivered_orders_data)} delivered orders for {product.product_name}")
            self.stdout.write(self.style.SUCCESS(f"Created product: {product.product_name}"))

        self.stdout.write(self.style.SUCCESS(f"Successfully added {len(SAMPLE_PRODUCTS)} products"))
        self.stdout.write(
            self.style.SUCCESS(f"Products with costs: {Product.objects.filter(product_cost__isnull=False).count()}")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Products without costs: {Product.objects.filter(product_cost__isnull=True).count()}")
        )
