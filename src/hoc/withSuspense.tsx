import React, { Suspense } from 'react';
import Preloader from '../assets/Preloaders/Preloader';

export const withSuspense = <WCP,>(Component: React.ComponentType<WCP>) => {
  return (props: WCP) => {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
