import QueryParamsStore from 'store/RootStore/QueryParamsStore/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
}
