import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:3000/qa/questions/1');
  http.post('http://localhost:3000/qa/questions/4/answers');
  sleep(1);
}

