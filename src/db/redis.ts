import Redis from "ioredis";

const redis = new Redis();
redis.on("connect", () => {
    console.log("Connected to Redis"); 
})
redis.on('error', (err) => {
    console.error('Redis error:', err);
    process.exit(1);
  });
export default redis
