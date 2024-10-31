import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  duration: '10s',
  vus: 50,
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');
  sleep(1);
}
