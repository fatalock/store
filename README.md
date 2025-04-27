# store
yapılacaklar:

get user order

delete user
delete order
delete product
delete category



--------------
Category İşlemleri

POST /api/categories

Yeni bir kategori eklemek için:

Ana Kategori eklemek:
{
  "name": "Kahve Ekipmanları"
}
Alt Kategori eklemek:
{
  "name": "Değirmen",
  "parentCategoryId": "parent-kategori-uuid"
}
----------
GET /api/categories

Tüm kategorileri listelemek için:

cevap:
{
    "$id": "1",
    "$values": [
        {
            "$id": "2",
            "id": "035a72f5-356f-4fba-b09c-d0104f6c2fcb",
            "name": "Kahve Ekipmanları",
            "parentCategoryId": null,
            "parentCategory": null,
            "subCategories": {
                "$id": "3",
                "$values": [
                    {
                        "$id": "4",
                        "id": "5996d8b8-dfe4-42ae-a48c-ae85ff44850e",
                        "name": "Değirmen",
                        "parentCategoryId": "035a72f5-356f-4fba-b09c-d0104f6c2fcb",
                        "parentCategory": {
                            "$ref": "2"
                        },
                        "subCategories": {
                            "$id": "5",
                            "$values": []
                        },
                        "products": {
                            "$id": "6",
                            "$values": []
                        }
                    },
                    {
                        "$id": "7",
                        "id": "fa3bf421-24b3-4146-bde9-20851b748d9c",
                        "name": "Espresso Maker 1",
                        "parentCategoryId": "035a72f5-356f-4fba-b09c-d0104f6c2fcb",
                        "parentCategory": {
                            "$ref": "2"
                        },
                        "subCategories": {
                            "$id": "8",
                            "$values": []
                        },
                        "products": {
                            "$id": "9",
                            "$values": []
                        }
                    }
                ]
            },
            "products": {
                "$id": "10",
                "$values": []
            }
        },
        {
            "$id": "11",
            "id": "55739673-3335-47f4-a0a5-03575739a3b4",
            "name": "Endustriyel Mutfak",
            "parentCategoryId": null,
            "parentCategory": null,
            "subCategories": {
                "$id": "12",
                "$values": []
            },
            "products": {
                "$id": "13",
                "$values": []
            }
        },
        {
            "$ref": "4"
        },
        {
            "$ref": "7"
        }
    ]
}
-----------
GET /api/categories/{parentCategoryId}/subcategories

Belirli bir kategoriye bağlı alt kategorileri listelemek için:

cevap:

{
    "$id": "1",
    "$values": [
        {
            "$id": "2",
            "id": "5996d8b8-dfe4-42ae-a48c-ae85ff44850e",
            "name": "Değirmen",
            "parentCategoryId": "035a72f5-356f-4fba-b09c-d0104f6c2fcb",
            "parentCategory": null,
            "subCategories": {
                "$id": "3",
                "$values": []
            },
            "products": {
                "$id": "4",
                "$values": []
            }
        },
        {
            "$id": "5",
            "id": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "name": "Espresso Maker 1",
            "parentCategoryId": "035a72f5-356f-4fba-b09c-d0104f6c2fcb",
            "parentCategory": null,
            "subCategories": {
                "$id": "6",
                "$values": []
            },
            "products": {
                "$id": "7",
                "$values": []
            }
        }
    ]
}
------------
GET /api/categories/{id}
Belirli bir kategoriyi detaylı görüntülemek için:

***************************
Product İşlemleri

POST /api/products

Yeni bir ürün eklemek için:
{
  "name": "Delonghi Espresso Makinesi",
  "description": "Yüksek basınçlı espresso makinesi",
  "price": 3500,
  "stockQuantity": 5,
  "categoryId": "kategori-uuid",
  "imageUrl": "https://example.com/image.jpg"
}
-----------
GET /api/products

Tüm ürünleri listelemek için:

cevap:
{
    "$id": "1",
    "$values": [
        {
            "$id": "2",
            "id": "715a59b2-4542-4107-966a-f594db049991",
            "name": "Delonghi Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 3500,
            "stockQuantity": 5,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        },
        {
            "$id": "3",
            "id": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
            "name": "Arçelik Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 4500,
            "stockQuantity": 2,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        }
    ]
}

----------
GET /api/products/{id}
Belirli bir ürünü detaylı görüntülemek için:
cevap:
{
    "$id": "1",
    "id": "715a59b2-4542-4107-966a-f594db049991",
    "name": "Delonghi Espresso Makinesi",
    "description": "Yüksek basınçlı espresso makinesi",
    "price": 3500,
    "stockQuantity": 5,
    "imageUrl": "https://example.com/image.jpg",
    "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
    "category": null
}
------------
GET /api/products/bycategory/{categoryId}
Belirli bir kategoriye bağlı ürünleri listelemek için:
cevap:
{
    "$id": "1",
    "$values": [
        {
            "$id": "2",
            "id": "715a59b2-4542-4107-966a-f594db049991",
            "name": "Delonghi Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 3500,
            "stockQuantity": 5,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        },
        {
            "$id": "3",
            "id": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
            "name": "Arçelik Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 4500,
            "stockQuantity": 2,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        }
    ]
}
----------
GET /api/products/byparentcategory/{parentCategoryId}
Belirli bir üst kategoriye bağlı alt kategorilerdeki ürünleri listelemek için:
cevap:
{
    "$id": "1",
    "$values": [
        {
            "$id": "2",
            "id": "715a59b2-4542-4107-966a-f594db049991",
            "name": "Delonghi Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 3500,
            "stockQuantity": 5,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        },
        {
            "$id": "3",
            "id": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
            "name": "Arçelik Espresso Makinesi",
            "description": "Yüksek basınçlı espresso makinesi",
            "price": 4500,
            "stockQuantity": 2,
            "imageUrl": "https://example.com/image.jpg",
            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
            "category": null
        }
    ]
}
**********************************

User İşlemleri

POST /api/users

Yeni bir kullanıcı kaydetmek için:
{
  "name": "Fatih",
  "email": "fatih@example.com",
  "passwordHash": "123456",
  "role": "Customer"
}
--------------
GET /api/users/{id}
Belirli bir kullanıcıyı detaylı görüntülemek için:
cevap:
{
    "$id": "1",
    "id": "ca0bf502-3888-43da-902f-603fdb2d7f83",
    "email": "fatih@example.com",
    "passwordHash": "123456",
    "name": "Fatih",
    "role": "Customer",
    "createdAt": "2025-04-27T12:00:53.543504Z",
    "orders": {
        "$id": "2",
        "$values": []
    }
}
**********************

Order İşlemleri

POST /api/orders

Yeni bir sipariş oluşturmak için:
{
  "userId": "kullanici-uuid",
  "orderItems": [
    {
      "productId": "ürün-uuid",
      "quantity": 2
    }
  ]
}
--------------
GET /api/orders/{id}

Bir siparişi detaylı görüntülemek için:

cevap:
{
    "$id": "1",
    "id": "12b256b3-c7ad-4c1f-a7dc-a108f465a3c9",
    "userId": "ca0bf502-3888-43da-902f-603fdb2d7f83",
    "user": null,
    "createdAt": "2025-04-27T12:02:52.627778Z",
    "totalPrice": 7000,
    "status": "Pending",
    "orderItems": {
        "$id": "2",
        "$values": [
            {
                "$id": "3",
                "id": "d784c912-82fe-4aea-819a-c612f1848e76",
                "orderId": "12b256b3-c7ad-4c1f-a7dc-a108f465a3c9",
                "order": {
                    "$ref": "1"
                },
                "productId": "715a59b2-4542-4107-966a-f594db049991",
                "product": null,
                "quantity": 2,
                "unitPrice": 3500,
                "orderItemTotalPrice": 7000
            }
        ]
    }
}