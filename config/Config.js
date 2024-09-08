const environment = {
    local: {
        PORT: 4000,
        DATABASE: "mongodb://localhost:27017/Tutorial"
    },
    staging: {
        PORT: 9273,
        DATABASE: "mongodb://sdirect:RJMtygb22vtGFV@localhost:9048/sdirect?authSource=sdirect"
    }
}
export default environment;
