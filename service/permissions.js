const { rule, shield} = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
	return ctx.user !== null;
});

const allow = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
	return true;
});

module.exports = {
	permissions: shield({
		Query: allow,
		User: {
			id: allow,
			name: allow,
			posts: isAuthenticated,
		},

		Post: allow,

		__Schema: allow,
		__Type: allow,
		__Field: allow,
		__InputValue: allow,
		__EnumValue: allow,
		__Directive: allow,
	})
};
