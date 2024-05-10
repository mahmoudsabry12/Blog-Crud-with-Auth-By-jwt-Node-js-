// /**
//  * @swagger
//  * tags:
//  *   name: /articles/
//  *   description: Operations related to articles
//  */

// const express = require('express');
// const Article = require('./../models/article');
// const router = express.Router();

// /**
//  * @swagger
//  * /articles/new:
//  *   get:
//  *     summary: Render form to create a new article
//  *     tags: [Articles]
//  *     responses:
//  *       200:
//  *         description: HTML form to create a new article
//  */
// router.get('/new', (req, res) => {
//   res.render('articles/new', { article: new Article() });
// });

// /**
//  * @swagger
//  * /articles/edit/{id}:
//  *   get:
//  *     summary: Render form to edit an existing article
//  *     tags: [Articles]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the article to edit
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: HTML form to edit an article
//  *       404:
//  *         description: Article not found
//  */
// router.get('/edit/:id', async (req, res) => {
//   const article = await Article.findById(req.params.id);
//   if (!article) return res.status(404).send('Article not found');
//   res.render('articles/edit', { article: article });
// });

// /**
//  * @swagger
//  * /articles:
//  *   post:
//  *     summary: Create a new article
//  *     tags: [Articles]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               markdown:
//  *                 type: string
//  *     responses:
//  *       302:
//  *         description: Redirect to the newly created article
//  *       500:
//  *         description: Internal Server Error
//  */
// router.post('/', async (req, res, next) => {
//   req.article = new Article();
//   next();
// }, saveArticleAndRedirect('new'));

// /**
//  * @swagger
//  * /articles/{id}:
//  *   put:
//  *     summary: Update an existing article
//  *     tags: [Articles]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the article to update
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               markdown:
//  *                 type: string
//  *     responses:
//  *       302:
//  *         description: Redirect to the updated article
//  *       500:
//  *         description: Internal Server Error
//  */
// router.put('/:id', async (req, res, next) => {
//   req.article = await Article.findById(req.params.id);
//   next();
// }, saveArticleAndRedirect('edit'));

// /**
//  * @swagger
//  * /articles/{id}:
//  *   delete:
//  *     summary: Delete an article
//  *     tags: [Articles]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the article to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       302:
//  *         description: Redirect to home after deletion
//  *       500:
//  *         description: Internal Server Error
//  */
// router.delete('/:id', async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id);
//   res.redirect('/');
// });

// function saveArticleAndRedirect(path) {
//   return async (req, res) => {
//     let article = req.article;
//     article.title = req.body.title;
//     article.description = req.body.description;
//     article.markdown = req.body.markdown;
//     try {
//       article = await article.save();
//       res.redirect(`/articles/${article.slug}`);
//     } catch (e) {
//       res.render(`articles/${path}`, { article: article });
//     }
//   };
// }

// module.exports = router;