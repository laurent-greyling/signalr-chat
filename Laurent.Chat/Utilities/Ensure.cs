using System;
using System.Globalization;

namespace Laurent.Chat.Utilities
{
    /// <summary>
    /// Class that contains the basic method parameter checks
    /// </summary>
    public static class Ensure
    {
        /// <summary>
        /// Having an attibute named 'ValidatedNotNull' allows us to defer parameter checking
        /// to a separate class and prevents firing CA1062 unnecessarily.
        /// </summary>
        [AttributeUsage(AttributeTargets.Parameter)]
        private sealed class ValidatedNotNullAttribute : Attribute { }

        /// <summary>
        /// Throws an <see cref="ArgumentNullException"/> if the specified value is <see langword="null"/>.
        /// </summary>
        /// <param name="value">The value to test.</param>
        /// <param name="name">The name of the parameter, which will appear in the exception message.</param>
        public static void ArgumentNotNull([ValidatedNotNull] object value, string name)
        {
            if (value is null)
            {
                throw new ArgumentNullException(name);
            }
        }

        /// <summary>
        /// Throws an <see cref="ArgumentException"/> if the specified value is <see langword="null"/>
        /// or an empty string.
        /// </summary>
        /// <param name="value">The value to test.</param>
        /// <param name="name">The name of the parameter, which will appear in the exception message.</param>
        public static void ArgumentNotNullOrEmptyString([ValidatedNotNull] string value, string name)
        {
            Ensure.ArgumentNotNull(value, name);

            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException(
                    string.Format(CultureInfo.InvariantCulture,
                        "The argument '{0}' cannot be an empty string",
                        name), name);
            }
        }
    }
}
