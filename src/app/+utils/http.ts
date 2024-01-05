import { Connectable, Observable, ReplaySubject, connectable } from 'rxjs';

/**
 * used for single requests which needs to be fetched only one time and afterwards it is enough to replay e.g. languages, menu items, dynamic app configs, etc.
 * @param source
 */
export function staticRequest<T>(source: () => Observable<T>) {
  let connection: Connectable<T>;
  return () => {
    if (!connection) {
      // connection = source$().pipe(publishReplay(1)) as unknown as Connectable<O>;
      // (connection as Connectable<O>).connect();
      connection = connectable(source(), {
        connector: () => new ReplaySubject(1),
        resetOnDisconnect: false,
      });
      connection.connect();
    }
    return connection;
  };
}
