import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanTestData() {
    console.log('🧹 Nettoyage des données de test...');

    try {
        // Supprimer tous les livres de test
        const deletedBooks = await prisma.book.deleteMany({
            where: {
                OR: [
                    { title: { contains: 'livre' } },
                    { title: { contains: 'Livre' } },
                    { title: { contains: 'BOOK' } },
                ],
            },
        });
        console.log(`✅ ${deletedBooks.count} livres supprimés`);

        // Supprimer tous les auteurs de test
        const deletedAuthors = await prisma.author.deleteMany({
            where: {
                OR: [
                    { name: { contains: 'auteur' } },
                    { name: { contains: 'Auth_' } },
                    { name: { contains: 'test' } },
                ],
            },
        });
        console.log(`✅ ${deletedAuthors.count} auteurs supprimés`);

        // Supprimer toutes les catégories de test
        const deletedCategories = await prisma.category.deleteMany({
            where: {
                OR: [
                    { name: { contains: 'catego' } },
                    { name: { contains: 'Cat_' } },
                    { name: { contains: 'test' } },
                    { name: { contains: 'TEST' } },
                ],
            },
        });
        console.log(`✅ ${deletedCategories.count} catégories supprimées`);

        console.log('✨ Nettoyage terminé !');
    } catch (error) {
        console.error('❌ Erreur lors du nettoyage:', error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanTestData();
