import { FadeLoader } from 'react-spinners';

export const RingLoaderComponent = ({ loading, size = 150, color = '#FF4AC0' }) => {
    return (
        <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FadeLoader loading={loading} size={size} color={color} />
        </div>
    );
};

