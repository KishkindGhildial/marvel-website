import { MD5 } from 'crypto-js';

export const getMarvelData = async url => {
  const PRIV_KEY = '17cdb1f441564fe63e9128abb37d1489be7263d2';
  const PUB_KEY = '1810d2d7ef7043b15612ca579e577e7e';
  let timeStamp = new Date().getTime();
  let hash = MD5(timeStamp + PRIV_KEY + PUB_KEY).toString();

  const response = await fetch(url, {
    ts: timeStamp,
    apikey: PUB_KEY,
    hash: hash,
  });

  const parsedResponse = await response.json();

  return parsedResponse;
};
