const UserRole = {
    ADMIN: 'admin',
    CLIENT: 'client',
    TAILOR: 'tailor'
};

const ORDER_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    IN_PROGRESS: 'in_progress',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
};

const FabricType = {
    COTTON: 'cotton',
    SILK: 'silk',
    WOOL: 'wool',
    POLYSTER: 'polyster',
    LINEN: 'linen'
};

const MediaType = {
    IMAGE: 'image',
    VIDEO: 'video'
};

module.exports = {
    UserRole,
    OrderStatus,
    FabricType,
    MediaType
};