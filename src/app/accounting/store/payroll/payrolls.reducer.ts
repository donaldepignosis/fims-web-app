/**
 * Copyright 2017 The Mifos Initiative.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {ResourceState} from '../../../common/store/resource.reducer';
import {idsToHashWithCurrentTimestamp, resourcesToHash} from '../../../common/store/reducer.helper';
import * as payroll from './payroll-collection.actions';
import {PayrollCollectionHistory} from '../../../services/payroll/domain/payroll-collection-history.model';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: payroll.Actions): ResourceState {

  switch (action.type) {

    case payroll.LOAD_ALL_COLLECTIONS: {
      return initialState;
    }

    case payroll.LOAD_ALL_COLLECTIONS_COMPLETE: {
      const payrolls: PayrollCollectionHistory[] = action.payload;

      const ids = payrolls.map(payroll => payroll.identifier);

      const entities = resourcesToHash(payrolls);

      const loadedAt = idsToHashWithCurrentTimestamp(ids);

      return {
        ids: [ ...ids ],
        entities: entities,
        loadedAt: loadedAt,
        selectedId: state.selectedId
      };
    }

    default: {
      return state;
    }
  }
}
