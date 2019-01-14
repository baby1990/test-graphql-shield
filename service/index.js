const {GraphQLServer} = require('graphql-yoga');

const {Prisma} = require('./generated/prisma');
const {resolvers, fragmentReplacements} = require('./resolvers');
const express = require('express');
const path = require('path');

const {permissions} = require('./permissions');

const db = new Prisma({
	fragmentReplacements,
	endpoint: 'http://localhost:4466/dev/demo',
	secret: 'prisma',
	debug: true,
});

const server = new GraphQLServer({
	typeDefs: path.resolve(__dirname, './schema.graphql'),
	resolvers,
	middlewares: [permissions],
	context: async req => ({...req, db, user: {id: 'june'}}),
});

server.start(({port}) =>
	console.log(`Server is running on http://localhost:${port}`),
);


// add user and posts
// mutation {
// 	createUser(data: {
// 		name: "June"
// 		posts: {
// 			create: {
// 				title: "hello world"
// 				content: "hello world, graphql"
// 				publish: false
// 			}
// 		}
// 	}) {
// 		id
// 		name
// 		posts {
// 			id
// 			title
// 			content
// 			publish
// 		}
// 	}
// }

// test case 1
// query {
// 	user(id: "cjqvom8dt0014088577nx1li9") {         // your user id
// 		id
// 		posts(where: {publish: false}) {
// 			id
//          publish
// 		}
// 		postsRenamed: posts(where: {publish: false}) {
// 			id
//          publish
// 		}
// 	}
// }

// test case 2
// query {
// 	user(id: "cjqvom8dt0014088577nx1li9") {         // your user id
// 		id
// 		postsRenamed: posts(where: {publish: false}) {
// 			id
//          publish
// 		}
// 	}
// }

// test case 3
// query {
// 	user(id: "cjqvom8dt0014088577nx1li9") {
// 		id
// 		posts(where: {publish: false}) {
// 			id
//          publish
// 		}
// 		postsRenamed: posts(where: {publish: true}) {
// 			id
//          publish
// 		}
// 	}
// }
