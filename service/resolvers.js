const {extractFragmentReplacements} = require('prisma-binding');

const resolvers = {
	Query: {
		user(parent, {id}, ctx, info) {
			// 校验code

			// 获取当前用户
			return ctx.db.query.user({
				where: {
					id
				}
			}, info);

		},
	},
};

module.exports = {
	resolvers: resolvers,
	fragmentReplacements: extractFragmentReplacements(resolvers),
};
