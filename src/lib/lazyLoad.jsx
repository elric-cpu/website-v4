import React, { Suspense, lazy } from "react";

/**
 * Loading fallback component
 * Displays while lazy-loaded components are being fetched
 */
const LoadingFallback = ({ message = "Loading..." }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  </div>
);

/**
 * Error fallback component
 * Displays when lazy loading fails
 */
const ErrorFallback = ({ error, resetError }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Failed to load page
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="px-4 py-2 bg-maroon text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

/**
 * Error boundary for catching lazy load errors
 */
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lazy load error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Creates a lazy-loaded component with Suspense and error boundary
 * @param {Function} importFn - Dynamic import function, e.g., () => import('./MyComponent')
 * @param {Object} options - Configuration options
 * @param {string} options.loadingMessage - Custom loading message
 * @param {number} options.delay - Minimum delay before showing loader (prevents flash)
 * @returns {React.Component} Wrapped lazy component
 */
export function lazyLoad(importFn, options = {}) {
  const { loadingMessage = "Loading...", delay = 0 } = options;

  // Add artificial delay if specified (helps prevent flash of loading state)
  const delayedImport = delay > 0
    ? () =>
        Promise.all([
          importFn(),
          new Promise((resolve) => setTimeout(resolve, delay)),
        ]).then(([module]) => module)
    : importFn;

  const LazyComponent = lazy(delayedImport);

  // Return a wrapped component with error boundary and suspense
  const WrappedComponent = (props) => (
    <LazyErrorBoundary>
      <Suspense fallback={<LoadingFallback message={loadingMessage} />}>
        <LazyComponent {...props} />
      </Suspense>
    </LazyErrorBoundary>
  );

  // Copy display name for debugging
  WrappedComponent.displayName = `LazyLoaded(${
    LazyComponent.displayName || LazyComponent.name || "Component"
  })`;

  return WrappedComponent;
}

/**
 * Preload a lazy component (useful for prefetching on hover)
 * @param {Function} importFn - Dynamic import function
 */
export function preloadComponent(importFn) {
  importFn();
}

/**
 * Create a preloadable lazy component
 * Returns both the component and a preload function
 * @param {Function} importFn - Dynamic import function
 * @param {Object} options - Configuration options
 * @returns {{ Component: React.Component, preload: Function }}
 */
export function lazyWithPreload(importFn, options = {}) {
  const Component = lazyLoad(importFn, options);
  return {
    Component,
    preload: () => preloadComponent(importFn),
  };
}

/**
 * Named exports for common lazy load configurations
 */
export const lazyPage = (importFn) =>
  lazyLoad(importFn, { loadingMessage: "Loading page..." });

export const lazyComponent = (importFn) =>
  lazyLoad(importFn, { loadingMessage: "Loading..." });

export const lazyHeavy = (importFn) =>
  lazyLoad(importFn, { loadingMessage: "Loading content...", delay: 100 });

export default lazyLoad;
