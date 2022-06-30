import * as t from '../types';
import { filterOptions } from '../../config/index.json';

const main = (
  state = {
    name: 'guest',
    loading: false,
    error: null,
    dishes: [],
    filterOptions,
    restaurants: [],
    query: '',
    searchQuery: '',
  },
  action
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case t.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case t.REGISTER:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case t.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case t.SIGN_OUT:
      return {
        name: 'guest',
        loading: false,
      };
    case t.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case t.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case t.CREATE_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };
    case t.DELETE_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case t.UPDATE_DISHES:
      return {
        ...state,
        dishes: action.payload,
      };
    case t.UPDATE_FILTER_OPTIONS:
      console.log(state.query);
      console.log(action.payload.value);
      return {
        ...state,

        filterOptions: state.filterOptions.map((filter) =>
          filter.value === action.payload.value
            ? // transform the one with a matching value

              { ...filter, clicked: !action.payload.clicked }
            : // otherwise return original filter
              filter
        ),
      };
    case t.DELETE_BOXES:
      const newArr = state.filterOptions.filter((object) => {
        return object.filterOptions.value !== action.payload.value;
      });

      return {
        ...state,
        checkedBoxes: newArr,
      };

    case t.UPDATE_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case t.UPDATE_QUERY:
      const q = [];
      const variable = action.payload;

      if (typeof variable === 'string') {
        console.log('running1');
        // 👇️ this runs
        console.log('✅ type is string');
        q.push(`?${action.payload}`);
      }
      action.payload.forEach(function (each) {
        if (state.query.length <= 0) {
          console.log('running2');
          q.push(`?${each.value}`);
        } else {
          console.log('running3');
          q.push(`&${each.value}`);
        }
      });
      return {
        ...state,
        query: [...state.query, q.join('')].join(''),
      };

    case t.DELETE_QUERY:
      const query = state.query.replace(action.payload, '');
      var lastLetter = query[query.length - 1];

      if (lastLetter === '&' || query === '?') {
        return {
          ...state,
          query: query.slice(0, -1),
        };
      }
      return {
        ...state,
        query,
      };
    case t.UPDATE_SEARCH_QUERY:
      const searchQuery = `?search?=${action.payload1.searchQuery}`;

      const filterQuery = `&${action.payload2.slice(1)}`;
      const payload = `&${action.payload2.slice(1)}`;

      console.log(`searchQuery ==== ${searchQuery}`);
      console.log(`filterQuery ==== ${payload}`);

      // if (action.payload2.includes('?search?=')) {
      //   const removeFromString = (s, x, y) => {
      //     const array = [...s];
      //     array.splice(x, y);
      //     return array.join('');
      //   };

      //   newQuery = removeFromString(action.payload2, 0, 15);
      //   console.log(newQuery);
      //   if (newQuery.substring(0, 1) === '&') {
      //     filterQuery = newQuery;
      //     console.log('adding &');
      //   } else {
      //     filterQuery = `&${newQuery}`;
      //     console.log('not adding &');
      //   }
      // }
      // console.log('no search');

      const mainQuery = searchQuery + filterQuery;
      return {
        ...state,
        query: filterQuery,
        searchQuery,
      };

    // case t.UPDATE_SEARCH_AND_FILTER_QUERY:
    //   return {
    //     ...state,
    //     searchQuery,
    //   };

    default:
      return { ...state };
  }
};

export default main;
