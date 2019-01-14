# test graphql-shield

## Build Setup

``` bash
# install dependencies
npm install

# setup prisma service
cd prisma && docker-compose up -d && prisma deploy

# setup simple demo
npm start

# setup prisma demo
npm run prisma
```

test case is in the comments of index.js