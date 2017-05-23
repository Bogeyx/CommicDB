using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace CommicDB.Utility
{
    public static class ClientException<T>
    {
        public static T Show(Exception error, HttpResponse response, object args, [CallerMemberName]string method = "")
        {
            if (!response.HasStarted)
            {
                response.StatusCode = 400;
                response.Headers["Error"] = ReturnCleanASCII(method + "(" + JsonConvert.SerializeObject(args) + "):          " + error.ToString());
            }
            else
            {
                throw error;
            }

            return default(T);
        }

        private static string ReturnCleanASCII(string s)
        {
            StringBuilder sb = new StringBuilder(s.Length);
            foreach (char c in s.ToCharArray())
            {
                if ((int)c > 127)
                    continue;
                if ((int)c < 32)
                    continue;
                if (c == ',')
                    continue;
                if (c == '"')
                    continue;
                sb.Append(c);
            }
            return new String(sb.ToString().Take(1023 * 4).ToArray());
        }
    }
}
