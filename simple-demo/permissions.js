const { rule, shield, /* and, or, not*/ } = require('graphql-shield');

// Rules
const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
	console.log(ctx);
	return ctx.user !== null;
});

const allow = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
	return true;
});

// Permissions

module.exports = {
	permissions: shield({
		Query: allow,
		User: {
			id: allow,
			name: allow,
			posts: isAuthenticated,
			role: allow
		},
		Post: allow,
	})
};
