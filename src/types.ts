export type TCreateChatRes =
  | {
      status: 'success';
      data: {
        id: string;
        userId: string;
        siteTitle: string;
        siteUrl: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  | {
      status: 'error';
      message: string;
    };

export type Chats =
  | {
      status: 'success';
      data: {
        id: string;
        userId: string;
        siteTitle: string;
        siteUrl: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
    }
  | {
      status: 'error';
      message: string;
    };

export type Chat = {
  status: 'success';
  data: {
    id: string;
    userId: string;
    siteTitle: string;
    siteUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
