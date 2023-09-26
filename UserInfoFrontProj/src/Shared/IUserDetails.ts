interface IUserDetails {
    token: string,
    id: number;
    name: string;
    team: string;
    joinedAt: Date;
    avatar: string;
}

export default IUserDetails;