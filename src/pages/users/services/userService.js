import { PAGE_SIZE } from '../constants';
import { post } from '../../../utils/request';


export function fetch({ page = 1 }) {
  return post(`/users`, { page, pageSize: PAGE_SIZE });
}

export function remove(id) {
  return post(`/users`, { id });
}

export function patch(id, values) {
  return post(`/users`, { id, values });
}

export function create(values) {
  return post('/users', { values });
}
