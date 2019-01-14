const { GraphQLServer } = require('graphql-yoga');
const {permissions} = require('./permissions');

const typeDefs = `
  type Query {
	me: User
	user(id: String!): User
	post(id: String!): Post
  }
  
  type User {
	id: String!            
	name: String
	posts(where: postWhereInput): [Post]           
	role: Role              
  }
  
  type Post {
    publish: Boolean!
	id: String!
	title: String
	content: String
	auther: User            
  }
  
  input postWhereInput {
    publish: Boolean
  }
  
  enum Role { customer, master, admin }
`;


const usersList = [
	{
		id: '1',
		name: 'June',
		role: 'admin'
	},
	{
		id: '2',
		name: 'Jim',
		role: 'customer'
	}
];

const postsList = [
	{
		id: "1001",
		title: "Hello World!",
		content: "Hello world, June~",
		publish: false
	},
	{
		id: "1002",
		title: "GraphQL",
		content: "GraphQL knowledge",
		publish: true
	}
];

const resolvers = {
	Query: {
		me: (_, args) => Object.assign(usersList[0], {posts: postsList}),

		user: (_, { id }) => usersList.find(item => item.id === id) || null,

		post: (_, { id }) => postsList.find(item => item.id === id),
	},
	User: {
		posts: (_, {where}) => {
			console.log(where);

			if (where && where.publish !== undefined) {
				return _.posts.filter(post => post.publish === where.publish);
			}

			return _.posts;
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	middlewares: [permissions],
	context: async req => ({...req, user: usersList[0]}),
});

server.start(() => console.log('Server is running on localhost:4000'));


/*
 simple demo query, it works correctly

 test case

 query {
  me {
    id
    posts {
      id
      publish
    }
    publishPosts: posts(
      where:{
        publish: true
      }
    ) {
      id
      publish
    }
  }
}
 */