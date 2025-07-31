# store
yapılacaklar:





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
-----------
DELETE /api/categories/{id}
Belirli bir kategoriyi silmek için:

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
POST /api/products/{productId}/addstock
stock eklemece:

5
---------
PATCH /api/{id}/price
product new price

120
----------
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
---------
DELETE /api/products/{id}
Belirli bir ürünü silmek için:

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
------------
DELETE /api/users/{id}
Belirli bir kullanıcıyı silmek için:
**********************

Order İşlemleri

POST /api/orders

Yeni bir sipariş oluşturmak için:
{
  "userId": "kullanici-uuid",
  "orderItems": [
    {
      "productId": "urun1-uuid",
      "quantity": 2
    },
    {
      "productId": "urun2-uuid",
      "quantity": 1
    },
    {
      "productId": "urun3-uuid",
      "quantity": 5
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
----------
GET /api/orders/byuser/{userId}
Belirli bir kullanıcının tüm siparişlerini listelemek için:
cevap:
{
    "$id": "1",
    "$values": [
        {
            "$id": "6",
            "id": "4b7e8c6b-e40b-4630-a1ff-bd1c470c90ff",
            "userId": "ca0bf502-3888-43da-902f-603fdb2d7f83",
            "user": null,
            "createdAt": "2025-04-27T15:56:53.538109Z",
            "totalPrice": 4500,
            "status": "Pending",
            "orderItems": {
                "$id": "7",
                "$values": [
                    {
                        "$id": "8",
                        "id": "c91143c8-4e8b-48cf-aca7-cfd308d15516",
                        "orderId": "4b7e8c6b-e40b-4630-a1ff-bd1c470c90ff",
                        "order": {
                            "$ref": "6"
                        },
                        "productId": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
                        "product": {
                            "$id": "9",
                            "id": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
                            "name": "Arçelik Espresso Makinesi",
                            "description": "Yüksek basınçlı espresso makinesi",
                            "price": 4500,
                            "stockQuantity": 0,
                            "imageUrl": "https://example.com/image.jpg",
                            "categoryId": "fa3bf421-24b3-4146-bde9-20851b748d9c",
                            "category": null
                        },
                        "quantity": 1,
                        "unitPrice": 4500,
                        "orderItemTotalPrice": 4500
                    }
                ]
            }
        },
        {
            "$id": "10",
            "id": "7ae8855f-6de7-4c1f-9fa9-e810867858fa",
            "userId": "ca0bf502-3888-43da-902f-603fdb2d7f83",
            "user": null,
            "createdAt": "2025-04-27T16:08:18.451757Z",
            "totalPrice": 8000,
            "status": "Pending",
            "orderItems": {
                "$id": "11",
                "$values": [
                    {
                        "$id": "12",
                        "id": "1bc82fcf-d003-4564-94a2-a891f06d861e",
                        "orderId": "7ae8855f-6de7-4c1f-9fa9-e810867858fa",
                        "order": {
                            "$ref": "10"
                        },
                        "productId": "715a59b2-4542-4107-966a-f594db049991",
                        "product": {
                            "$ref": "5"
                        },
                        "quantity": 1,
                        "unitPrice": 3500,
                        "orderItemTotalPrice": 3500
                    },
                    {
                        "$id": "13",
                        "id": "71055dba-e2f2-46a3-bce5-670504978893",
                        "orderId": "7ae8855f-6de7-4c1f-9fa9-e810867858fa",
                        "order": {
                            "$ref": "10"
                        },
                        "productId": "46452c20-d146-4b0d-8cbd-7669c3e65fcb",
                        "product": {
                            "$ref": "9"
                        },
                        "quantity": 1,
                        "unitPrice": 4500,
                        "orderItemTotalPrice": 4500
                    }
                ]
            }
        }
    ]
}
---------
DELETE /api/orders/{id}
Belirli bir siparişi silmek için: