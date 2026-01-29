import './Skeleton.css';

export const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <Skeleton height="200px" borderRadius="12px 12px 0 0" />
      <div className="skeleton-card-content">
        <Skeleton width="60%" height="24px" />
        <Skeleton width="100%" height="16px" className="mt-sm" />
        <Skeleton width="100%" height="16px" className="mt-xs" />
        <Skeleton width="80%" height="16px" className="mt-xs" />
        <div className="skeleton-card-footer">
          <Skeleton width="40px" height="40px" borderRadius="50%" />
          <div className="skeleton-card-user">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="80px" height="12px" className="mt-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
