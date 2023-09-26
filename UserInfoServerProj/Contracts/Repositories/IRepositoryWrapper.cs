using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository User{ get; }
        IProjectRepository Project { get; }
        void Save();
    }
}
