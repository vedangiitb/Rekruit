const TopBar = () => {
    const barStyle = {
        // position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#00289F',  // Construction orange color
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '16px',
        zIndex: 9999,  // Ensure it's on top
        boxShadow: '0 2px 4px rgba(0, 0, 0)',
    };

    const textStyle = {
        margin: 0,
        color: "white"
    };

    return (
        <div style={barStyle}>
            <p style={textStyle}>
                🚧 Our website is currently under construction. Some functionalities may not work as expected. Thank you for your patience! 🚧
            </p>
        </div>
    );
};

export default TopBar;
