class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

describe('FriendsList', () => {
  let friendsList: FriendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Leo');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Leo');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Leo');
  });

  describe('remove friends', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Leo');
      expect(friendsList.friends[0]).toEqual('Leo');
      friendsList.removeFriend('Leo');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throw an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Leo')).toThrow(
        new Error('Friend not found!'),
      );
    });
  });
});
