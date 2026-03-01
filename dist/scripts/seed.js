"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando seed COMPLETO de RibellA Vermouth');
    await prisma.token.deleteMany();
    await prisma.saleItem.deleteMany();
    await prisma.sale.deleteMany();
    await prisma.purchaseOrderProduct.deleteMany();
    await prisma.purchaseOrder.deleteMany();
    await prisma.supplierEvaluation.deleteMany();
    await prisma.rawMaterialPrice.deleteMany();
    await prisma.productMaterial.deleteMany();
    await prisma.stock.deleteMany();
    await prisma.price.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.rawMaterial.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.warehouse.deleteMany();
    await prisma.subCategory.deleteMany();
    await prisma.category.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.user.deleteMany();
    console.log('Base limpia');
    const admin = await prisma.user.create({
        data: {
            email: 'admin@ribella.com.ar',
            password: 'hashed123',
            name: 'Raúl Arizu',
            role: 'ADMIN',
            isVerified: true,
        },
    });
    const vendedor = await prisma.user.create({
        data: {
            email: 'ventas@ribella.com.ar',
            password: 'hashed123',
            name: 'Bianca Ramonda',
            role: 'SELLER',
            isVerified: true,
        },
    });
    const vermouthCat = await prisma.category.create({
        data: { name: 'Vermouth' },
    });
    const rossoSub = await prisma.subCategory.create({
        data: { name: 'Rosso', categoryId: vermouthCat.id },
    });
    const biancoSub = await prisma.subCategory.create({
        data: { name: 'Bianco', categoryId: vermouthCat.id },
    });
    const bodega = await prisma.supplier.create({
        data: {
            name: 'Bodega Familiar Arizu',
            city: 'Luján de Cuyo',
            state: 'Mendoza',
        },
    });
    const deposito = await prisma.warehouse.create({
        data: { name: 'Depósito RibellA', location: 'Godoy Cruz, Mendoza' },
    });
    const rosso = await prisma.product.create({
        data: {
            name: 'RibellA Vermouth Rosso 750ml',
            sku: 'RIB-ROSSO-750',
            description: 'Tipo Torino - Intenso y especiado',
            categoryId: vermouthCat.id,
            subCategoryId: rossoSub.id,
            supplierId: bodega.id,
            createdById: admin.id,
            images: ['/rosso.jpg'],
        },
    });
    const bianco = await prisma.product.create({
        data: {
            name: 'RibellA Vermouth Bianco 750ml',
            sku: 'RIB-BIANCO-750',
            description: 'Tipo Francés - Fresco y frutal',
            categoryId: vermouthCat.id,
            subCategoryId: biancoSub.id,
            supplierId: bodega.id,
            createdById: admin.id,
            images: ['/bianco.jpg'],
        },
    });
    await prisma.stock.createMany({
        data: [
            {
                productId: rosso.id,
                warehouseId: deposito.id,
                quantity: 3000,
                lowStockThreshold: 200,
            },
            {
                productId: bianco.id,
                warehouseId: deposito.id,
                quantity: 3000,
                lowStockThreshold: 150,
            },
        ],
    });
    await prisma.price.createMany({
        data: [
            {
                productId: rosso.id,
                type: 'RETAIL',
                amount: 20000,
                currency: 'ARS',
                validFrom: new Date(),
            },
            {
                productId: bianco.id,
                type: 'RETAIL',
                amount: 20000,
                currency: 'ARS',
                validFrom: new Date(),
            },
        ],
    });
    await prisma.rawMaterial.createMany({
        data: [
            {
                name: 'Ajenjo',
                sku: 'BOT-AJENJO',
                supplierId: bodega.id,
                unitPrice: 45000,
                unitOfMeasure: 'kg',
                stockQuantity: 25,
                lowStockThreshold: 5,
            },
            {
                name: 'Cáscara de pomelo rosado',
                sku: 'BOT-PO',
                supplierId: bodega.id,
                unitPrice: 18000,
                unitOfMeasure: 'kg',
                stockQuantity: 80,
            },
            {
                name: 'Canela en rama',
                sku: 'BOT-CAN',
                supplierId: bodega.id,
                unitPrice: 32000,
                unitOfMeasure: 'kg',
                stockQuantity: 40,
            },
            {
                name: 'Vainilla bourbon',
                sku: 'BOT-VAI',
                supplierId: bodega.id,
                unitPrice: 280000,
                unitOfMeasure: 'kg',
                stockQuantity: 8,
            },
            {
                name: 'Manzanilla',
                sku: 'BOT-MAN',
                supplierId: bodega.id,
                unitPrice: 55000,
                unitOfMeasure: 'kg',
                stockQuantity: 30,
            },
            {
                name: 'Lavanda seca',
                sku: 'BOT-LAV',
                supplierId: bodega.id,
                unitPrice: 68000,
                unitOfMeasure: 'kg',
                stockQuantity: 15,
            },
            {
                name: 'Vino base Malbec',
                sku: 'VIN-MAL',
                supplierId: bodega.id,
                unitPrice: 4200,
                unitOfMeasure: 'litro',
                stockQuantity: 5000,
            },
            {
                name: 'Alcohol etílico 96°',
                sku: 'ALC-96',
                supplierId: bodega.id,
                unitPrice: 8500,
                unitOfMeasure: 'litro',
                stockQuantity: 2000,
            },
            {
                name: 'Mosto concentrado',
                sku: 'MOS-CON',
                supplierId: bodega.id,
                unitPrice: 12000,
                unitOfMeasure: 'litro',
                stockQuantity: 1500,
            },
        ],
    });
    const clientesData = [
        {
            name: 'Narda Montealegre',
            phone: '1135886718',
            email: 'andre.m.birda@gmail.com',
        },
        { name: 'Andy', phone: '1135886718', email: 'noemail_andy@ribella.com' },
        {
            name: 'Marcelo Sulca',
            phone: '3513446112',
            email: 'marcelosulc4@gmail.com',
        },
        { name: 'Vicky Gutman', email: 'vickygutman81@gmail.com' },
        {
            name: 'Alejandro Tresenza',
            phone: '1141996882',
            email: 'noemail_alejandro@ribella.com',
        },
        {
            name: 'Ricardo Padilla',
            phone: '1168354594',
            email: 'noemail_ricardo@ribella.com',
        },
        {
            name: "Maria Sol D'amato",
            phone: '1134842224',
            email: 'noemail_mariasol@ribella.com',
        },
        { name: 'Cliente Mostrador', email: 'mostrador@ribella.com' },
    ];
    for (const c of clientesData) {
        await prisma.customer.upsert({
            where: { email: c.email },
            update: {},
            create: c,
        });
    }
    const ventas = [
        {
            fecha: '2025-12-02',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            cliente: 'Narda Montealegre',
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-02',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            metodo: 'CASH',
        },
        {
            fecha: '2025-12-02',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            cliente: 'Andy',
            metodo: 'CASH',
        },
        {
            fecha: '2025-12-02',
            tipo: 'rosso2',
            cant: 2,
            monto: 30000,
            cliente: 'Marcelo Sulca',
            metodo: 'DIGITAL',
        },
        { fecha: '2025-12-02', tipo: 'combo', cant: 4, monto: 0 },
        { fecha: '2025-12-02', tipo: 'bianco', cant: 1, monto: 0 },
        {
            fecha: '2025-12-03',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            metodo: 'CASH',
        },
        {
            fecha: '2025-12-03',
            tipo: 'rosso',
            cant: 1,
            monto: 20000,
            cliente: 'Vicky Gutman',
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-04',
            tipo: 'bianco',
            cant: 1,
            monto: 20000,
            metodo: 'DIGITAL',
        },
        { fecha: '2025-12-04', tipo: 'combo', cant: 2, monto: 0 },
        {
            fecha: '2025-12-04',
            tipo: 'rosso2',
            cant: 2,
            monto: 30000,
            cliente: 'Alejandro Tresenza',
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 28000,
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            cliente: 'Ricardo Padilla',
            metodo: 'CASH',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            cliente: "Maria Sol D'amato",
            metodo: 'DIGITAL',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            metodo: 'CASH',
        },
        {
            fecha: '2025-12-05',
            tipo: 'combo',
            cant: 2,
            monto: 30000,
            metodo: 'CASH',
        },
    ];
    for (const v of ventas) {
        const fecha = new Date(v.fecha + 'T12:00:00.000Z');
        const customer = v.cliente
            ? await prisma.customer.findFirst({
                where: { name: { contains: v.cliente, mode: 'insensitive' } },
            })
            : null;
        if (v.monto > 0) {
            const sale = await prisma.sale.create({
                data: {
                    userId: vendedor.id,
                    customerId: customer?.id || null,
                    totalAmount: v.monto,
                    paymentMethod: v.metodo === 'CASH' ? 'CASH' : 'DIGITAL',
                    status: 'COMPLETED',
                    saleDate: fecha,
                },
            });
            if (v.tipo === 'combo') {
                await prisma.saleItem.createMany({
                    data: [
                        {
                            saleId: sale.id,
                            productId: rosso.id,
                            quantity: 1,
                            unitPrice: v.monto / 2,
                        },
                        {
                            saleId: sale.id,
                            productId: bianco.id,
                            quantity: 1,
                            unitPrice: v.monto / 2,
                        },
                    ],
                });
                await prisma.stock.updateMany({
                    where: { productId: rosso.id },
                    data: { quantity: { decrement: 1 } },
                });
                await prisma.stock.updateMany({
                    where: { productId: bianco.id },
                    data: { quantity: { decrement: 1 } },
                });
            }
            else if (v.tipo === 'rosso' || v.tipo === 'rosso2') {
                await prisma.saleItem.create({
                    data: {
                        saleId: sale.id,
                        productId: rosso.id,
                        quantity: v.cant,
                        unitPrice: v.monto / v.cant,
                    },
                });
                await prisma.stock.updateMany({
                    where: { productId: rosso.id },
                    data: { quantity: { decrement: v.cant } },
                });
            }
            else if (v.tipo === 'bianco') {
                await prisma.saleItem.create({
                    data: {
                        saleId: sale.id,
                        productId: bianco.id,
                        quantity: v.cant,
                        unitPrice: v.monto / v.cant,
                    },
                });
                await prisma.stock.updateMany({
                    where: { productId: bianco.id },
                    data: { quantity: { decrement: v.cant } },
                });
            }
        }
        else {
            if (v.tipo === 'combo') {
                await prisma.stock.updateMany({
                    where: { productId: rosso.id },
                    data: { quantity: { decrement: Math.floor(v.cant / 2) } },
                });
                await prisma.stock.updateMany({
                    where: { productId: bianco.id },
                    data: { quantity: { decrement: Math.floor(v.cant / 2) } },
                });
            }
            else if (v.tipo === 'bianco') {
                await prisma.stock.updateMany({
                    where: { productId: bianco.id },
                    data: { quantity: { decrement: v.cant } },
                });
            }
        }
    }
    console.log('Cargando recetas reales de RibellA Rosso y Bianco...');
    const ajenjo = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-AJENJO' },
    });
    const pomelo = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-PO' },
    });
    const canela = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-CAN' },
    });
    const vainilla = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-VAI' },
    });
    const manzanilla = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-MAN' },
    });
    const lavanda = await prisma.rawMaterial.findFirst({
        where: { sku: 'BOT-LAV' },
    });
    const vinoMalbec = await prisma.rawMaterial.findFirst({
        where: { sku: 'VIN-MAL' },
    });
    const alcohol = await prisma.rawMaterial.findFirst({
        where: { sku: 'ALC-96' },
    });
    const mosto = await prisma.rawMaterial.findFirst({
        where: { sku: 'MOS-CON' },
    });
    await prisma.productMaterial.createMany({
        data: [
            {
                productId: rosso.id,
                rawMaterialId: vinoMalbec.id,
                quantity: 0.5625,
                unitOfMeasure: 'litro',
            },
            {
                productId: rosso.id,
                rawMaterialId: alcohol.id,
                quantity: 0.135,
                unitOfMeasure: 'litro',
            },
            {
                productId: rosso.id,
                rawMaterialId: mosto.id,
                quantity: 0.0525,
                unitOfMeasure: 'litro',
            },
            {
                productId: rosso.id,
                rawMaterialId: ajenjo.id,
                quantity: 1.875,
                unitOfMeasure: 'gramo',
            },
            {
                productId: rosso.id,
                rawMaterialId: pomelo.id,
                quantity: 6.0,
                unitOfMeasure: 'gramo',
            },
            {
                productId: rosso.id,
                rawMaterialId: canela.id,
                quantity: 3.0,
                unitOfMeasure: 'gramo',
            },
            {
                productId: rosso.id,
                rawMaterialId: vainilla.id,
                quantity: 0.9,
                unitOfMeasure: 'gramo',
            },
            {
                productId: rosso.id,
                rawMaterialId: manzanilla.id,
                quantity: 2.25,
                unitOfMeasure: 'gramo',
            },
        ],
    });
    await prisma.productMaterial.createMany({
        data: [
            {
                productId: bianco.id,
                rawMaterialId: vinoMalbec.id,
                quantity: 0.6,
                unitOfMeasure: 'litro',
            },
            {
                productId: bianco.id,
                rawMaterialId: alcohol.id,
                quantity: 0.105,
                unitOfMeasure: 'litro',
            },
            {
                productId: bianco.id,
                rawMaterialId: mosto.id,
                quantity: 0.045,
                unitOfMeasure: 'litro',
            },
            {
                productId: bianco.id,
                rawMaterialId: ajenjo.id,
                quantity: 0.6,
                unitOfMeasure: 'gramo',
            },
            {
                productId: bianco.id,
                rawMaterialId: pomelo.id,
                quantity: 4.5,
                unitOfMeasure: 'gramo',
            },
            {
                productId: bianco.id,
                rawMaterialId: manzanilla.id,
                quantity: 4.5,
                unitOfMeasure: 'gramo',
            },
            {
                productId: bianco.id,
                rawMaterialId: lavanda.id,
                quantity: 1.875,
                unitOfMeasure: 'gramo',
            },
            {
                productId: bianco.id,
                rawMaterialId: vainilla.id,
                quantity: 0.6,
                unitOfMeasure: 'gramo',
            },
            {
                productId: bianco.id,
                rawMaterialId: canela.id,
                quantity: 1.125,
                unitOfMeasure: 'gramo',
            },
        ],
    });
    console.log('Cargando proveedores de empaque, gastos operativos y costos reales...');
    const proveedorBotellas = await prisma.supplier.create({
        data: { name: 'Vidriería Mendoza', city: 'Godoy Cruz', state: 'Mendoza' },
    });
    const proveedorEtiquetas = await prisma.supplier.create({
        data: { name: 'Imprenta del Valle', city: 'Maipú', state: 'Mendoza' },
    });
    const proveedorCajas = await prisma.supplier.create({
        data: {
            name: 'Cartocor Argentina',
            city: 'Buenos Aires',
            state: 'Buenos Aires',
        },
    });
    await prisma.packagingMaterial.createMany({
        data: [
            {
                name: 'Botella 750ml verde',
                sku: 'EMP-BOT-750',
                supplierId: proveedorBotellas.id,
                unitPrice: 850,
                unitOfMeasure: 'unidad',
                stockQuantity: 10000,
            },
            {
                name: 'Corcho sintético',
                sku: 'EMP-CORCHO',
                supplierId: proveedorBotellas.id,
                unitPrice: 120,
                unitOfMeasure: 'unidad',
                stockQuantity: 12000,
            },
            {
                name: 'Capsule termorretractil',
                sku: 'EMP-CAPSULA',
                supplierId: proveedorBotellas.id,
                unitPrice: 80,
                unitOfMeasure: 'unidad',
                stockQuantity: 15000,
            },
            {
                name: 'Etiqueta frontal RibellA',
                sku: 'EMP-ETIQ-F',
                supplierId: proveedorEtiquetas.id,
                unitPrice: 250,
                unitOfMeasure: 'unidad',
                stockQuantity: 20000,
            },
            {
                name: 'Etiqueta trasera RibellA',
                sku: 'EMP-ETIQ-T',
                supplierId: proveedorEtiquetas.id,
                unitPrice: 200,
                unitOfMeasure: 'unidad',
                stockQuantity: 20000,
            },
            {
                name: 'Caja cartón x6 unidades',
                sku: 'EMP-CAJA-6',
                supplierId: proveedorCajas.id,
                unitPrice: 1800,
                unitOfMeasure: 'unidad',
                stockQuantity: 2000,
            },
        ],
    });
    const botella = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-BOT-750' },
    });
    const corcho = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-CORCHO' },
    });
    const capsula = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-CAPSULA' },
    });
    const etiqF = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-ETIQ-F' },
    });
    const etiqT = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-ETIQ-T' },
    });
    const caja6 = await prisma.packagingMaterial.findFirst({
        where: { sku: 'EMP-CAJA-6' },
    });
    await prisma.productPackaging.createMany({
        data: [
            {
                productId: rosso.id,
                packagingMaterialId: botella.id,
                quantityPerUnit: 1,
            },
            {
                productId: rosso.id,
                packagingMaterialId: corcho.id,
                quantityPerUnit: 1,
            },
            {
                productId: rosso.id,
                packagingMaterialId: capsula.id,
                quantityPerUnit: 1,
            },
            {
                productId: rosso.id,
                packagingMaterialId: etiqF.id,
                quantityPerUnit: 1,
            },
            {
                productId: rosso.id,
                packagingMaterialId: etiqT.id,
                quantityPerUnit: 1,
            },
            {
                productId: rosso.id,
                packagingMaterialId: caja6.id,
                quantityPerUnit: 1 / 6,
            },
            {
                productId: bianco.id,
                packagingMaterialId: botella.id,
                quantityPerUnit: 1,
            },
            {
                productId: bianco.id,
                packagingMaterialId: corcho.id,
                quantityPerUnit: 1,
            },
            {
                productId: bianco.id,
                packagingMaterialId: capsula.id,
                quantityPerUnit: 1,
            },
            {
                productId: bianco.id,
                packagingMaterialId: etiqF.id,
                quantityPerUnit: 1,
            },
            {
                productId: bianco.id,
                packagingMaterialId: etiqT.id,
                quantityPerUnit: 1,
            },
            {
                productId: bianco.id,
                packagingMaterialId: caja6.id,
                quantityPerUnit: 1 / 6,
            },
        ],
    });
    await prisma.expenseCategory.createMany({
        data: [
            { name: 'Community Manager', type: 'FIXED' },
            { name: 'Enólogo / Asesor', type: 'FIXED' },
            { name: 'Alquiler Depósito', type: 'FIXED' },
            { name: 'Luz y Servicios', type: 'FIXED' },
            { name: 'Sueldos Personal', type: 'FIXED' },
            { name: 'Fletes y Envíos', type: 'VARIABLE' },
            { name: 'Marketing Digital', type: 'VARIABLE' },
        ],
    });
    const cm = await prisma.expenseCategory.findFirst({
        where: { name: 'Community Manager' },
    });
    const enologo = await prisma.expenseCategory.findFirst({
        where: { name: 'Enólogo / Asesor' },
    });
    const alquiler = await prisma.expenseCategory.findFirst({
        where: { name: 'Alquiler Depósito' },
    });
    const servicios = await prisma.expenseCategory.findFirst({
        where: { name: 'Luz y Servicios' },
    });
    const sueldos = await prisma.expenseCategory.findFirst({
        where: { name: 'Sueldos Personal' },
    });
    await prisma.expense.createMany({
        data: [
            {
                categoryId: cm.id,
                description: 'Community Manager - Diciembre',
                amount: 850000,
                date: new Date('2025-12-05'),
            },
            {
                categoryId: enologo.id,
                description: 'Honorarios Enólogo Raúl',
                amount: 1200000,
                date: new Date('2025-12-10'),
                isRecurring: true,
                recurringInterval: 'monthly',
            },
            {
                categoryId: alquiler.id,
                description: 'Alquiler depósito Godoy Cruz',
                amount: 650000,
                date: new Date('2025-12-01'),
                isRecurring: true,
                recurringInterval: 'monthly',
            },
            {
                categoryId: servicios.id,
                description: 'Luz, gas, internet',
                amount: 180000,
                date: new Date('2025-12-15'),
                isRecurring: true,
                recurringInterval: 'monthly',
            },
            {
                categoryId: sueldos.id,
                description: 'Sueldo Bianca + ayudante',
                amount: 2100000,
                date: new Date('2025-12-30'),
                isRecurring: true,
                recurringInterval: 'monthly',
            },
        ],
    });
    console.log('¡COSTOS REALES CARGADOS!');
    console.log('Empaque, proveedores, gastos fijos y variables → todo listo para rentabilidad real');
    console.log('RibellA Vermouth ya es una empresa de verdad');
    console.log('Recetas de RibellA Rosso y Bianco cargadas correctamente');
    console.log('Listo para calcular costos, producir lotes y dominar el mercado');
    console.log('RIBELLA VERMOUTH CARGADA 100%');
    console.log('Materias primas, productos, stock, clientes y todas las ventas reales del 2 al 5 dic 2025');
    console.log('¡A romperla en Navidad, Jesús!');
    console.log('Salud por RibellA');
}
main()
    .catch((e) => {
    console.error('Error fatal:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map