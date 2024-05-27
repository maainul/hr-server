
export const createDivisionCtrl = async (req, res) => {
    try {
      
        return res.status(200).json({
            success: true,
            message: 'mainul',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error In Get All Employee List',
            error: error.message || error,
        });
    }
};

export const getDivisionCtrl = async (req, res) => {
    try {
      
        return res.status(200).json({
            success: true,
            message: 'mainul',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error In Get All Employee List',
            error: error.message || error,
        });
    }
};