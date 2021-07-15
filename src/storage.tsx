import * as React from 'react';
import { getDownloadURL } from 'rxfire/storage';
import { Observable } from 'rxjs';
import { ReactFireOptions, useObservable, ObservableStatus, useStorage } from './';
import { useSuspenseEnabledFromConfigAndContext } from './firebaseApp';
import { ref } from 'firebase/storage';

import type { UploadTask, UploadTaskSnapshot, StorageReference, StorageService } from 'firebase/storage';

/**
 * modified version of rxFire's _fromTask
 *
 * @param task
 */
function _fromTask(task: UploadTask) {
  return new Observable<UploadTaskSnapshot>((subscriber) => {
    const progress = (snap: UploadTaskSnapshot) => {
      return subscriber.next(snap);
    };
    const error = (e: any) => subscriber.error(e);
    const complete = () => {
      return subscriber.complete();
    };
    task.on('state_changed', progress, error, complete);

    // I REMOVED THE UNSUBSCRIBE RETURN BECAUSE IT CANCELS THE UPLOAD
    // https://github.com/firebase/firebase-js-sdk/issues/1659
  });
}

/**
 * Subscribe to the progress of a storage task
 *
 * @param task - the task you want to listen to
 * @param ref - reference to the blob the task is acting on
 * @param options
 */
export function useStorageTask<T = unknown>(task: UploadTask, ref: StorageReference, options?: ReactFireOptions<T>): ObservableStatus<UploadTaskSnapshot | T> {
  const observableId = `storage:task:${ref.toString()}`;
  const observable$ = _fromTask(task);

  return useObservable(observableId, observable$, options);
}

/**
 * Subscribe to a storage ref's download URL
 *
 * @param ref - reference to the blob you want to download
 * @param options
 */
export function useStorageDownloadURL<T = string>(ref: StorageReference, options?: ReactFireOptions<T>): ObservableStatus<string | T> {
  const observableId = `storage:downloadUrl:${ref.toString()}`;
  const observable$ = getDownloadURL(ref);

  return useObservable(observableId, observable$, options);
}

type StorageImageProps = {
  storagePath: string;
  storage?: StorageService;
  suspense?: boolean;
  placeHolder?: JSX.Element;
};

function StorageFromContext(props: StorageImageProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const storage = useStorage();

  props = { ...props, storage };

  return <INTERNALStorageImage {...props} />;
}

function INTERNALStorageImage(props: StorageImageProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>): JSX.Element {
  let { storage, storagePath, suspense, placeHolder, ...imgProps } = props;

  const reactfireOptions: ReactFireOptions<string> = {
    suspense: useSuspenseEnabledFromConfigAndContext(suspense),
  };

  if (!storage) {
    throw new Error('Storage was not passed to component INTERNALStorageImage. This should not be possible');
  }

  const { status, data: imgSrc } = useStorageDownloadURL(ref(storage, storagePath), reactfireOptions);

  if (status === 'success') {
    if (!(imgProps.alt || imgProps.alt === '')) {
      console.warn(
        `No alt prop provided for StorageImage with storagePath "${storagePath}"`,
        'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images'
      );
    }

    return <img src={imgSrc} alt={imgProps.alt} {...imgProps} />;
  } else {
    return placeHolder ?? <>''</>;
  }
}

export function StorageImage(props: StorageImageProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  let { storage } = props;

  if (storage) {
    return <INTERNALStorageImage {...props} />;
  } else {
    return <StorageFromContext {...props} />;
  }
}
